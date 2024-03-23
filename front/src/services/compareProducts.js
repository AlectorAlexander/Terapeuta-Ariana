import { updateProduct } from "@/pages/api/products/stripe/update";
import stripe from "./stripe";

const getProductsNotInSecondList = (param1, param2) => {
  return param1.filter(product1 => {
    const matchingAPIProduct = param2.find(product2 => {
      return product2.id === product1.id;
    });
    return !matchingAPIProduct;
  });
};

/* STRIPE NÃO PERMITE ATUALIZAÇÃO DE PREÇOS */
/* export const updateStripeProductPrice = async (updates) => {
  const updatePromises = updates.map(async ({ stripeProduct, apiProduct }) => {
    try {
      // Lista os preços existentes do produto
      const existingPrices = await stripe.prices.list({
        product: stripeProduct.id,
        active: true
      });

      // Desativa os preços antigos
      existingPrices.data.forEach(async (price) => {
        await stripe.prices.update(price.id, { active: false });
        console.log(`Old price deactivated: ${price.id}`);
      });

      // Cria um novo preço
      const newPrice = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: apiProduct.default_price * 100,
        currency: 'brl', // ou sua moeda
      });
      console.log(`New price for ${stripeProduct.name} created: ${newPrice.id}`);
    } catch (error) {
      const message = error.raw ? error.raw.message : error.message;
      console.error(`Error updating price for ${stripeProduct.name}:`, message);
    }
  });

  await Promise.all(updatePromises);
}; */


export const updateStripeDescriptionProducts = async (updates) => {
  const updatePromises = updates.map(async ({ stripeProduct, apiProduct }) => {
    try {
      await stripe.products.update(stripeProduct.id, {
        description: apiProduct.description,
      });
      console.log(`Product ${stripeProduct.name} updated.`);
    } catch (error) {
      console.log(stripeProduct); 
      console.error(`Error updating product ${stripeProduct.name}:`, error);
    }
  });

  await Promise.all(updatePromises);
};

export const updateStripeProductName = async (updates) => {
  const updatePromises = updates.map(async ({ stripeProduct, apiProduct }) => {
    try {
      await stripe.products.update(stripeProduct.id, {
        name: apiProduct.name,
      });
      console.log(`Product name updated: ${stripeProduct.name} to ${apiProduct.name}.`);
    } catch (error) {
      console.error(`Error updating product name ${stripeProduct.name}:`, error);
    }
  });

  await Promise.all(updatePromises);
};


const updateApiProductStripeId = async (productId, stripeId) => {
  const data = {
    data: {
      stripe_id: stripeId
    },
    secret: process.env.NEXT_PUBLIC_APP_SECRET_KEY,
    productId,
  };
  try {
    await updateProduct(data);
  } catch (error) {
    console.error(`Error updating product stripe ID for product ${productId}:`, error);
  }
};

export const getUpdatedProducts = async (stripeProducts, apiProducts) => {
  /* const priceUpdates = []; */
  const namesUpdate = [];
  const descriptionUpdates = [];
  const stripeIdUpdates = [];


  stripeProducts.forEach(stripeProduct => {
    const apiProduct = apiProducts.find(product => product.id === stripeProduct.id);
    if (apiProduct) {
      /* STRIPE NÃO PERMITE ATUALIZAÇÃO DE PREÇOS */
      /* if (apiProduct.default_price !== stripeProduct.default_price.unit_amount / 100) {
        priceUpdates.push({ stripeProduct, apiProduct });
      } */
      const normalizeString = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

      const apiProductName = normalizeString(apiProduct.name);
      const stripeProductName = normalizeString(stripeProduct.name);

      if (apiProductName !== stripeProductName) {
        namesUpdate.push({ stripeProduct, apiProduct });
      }
      if (apiProduct.description !== stripeProduct.description) {
        descriptionUpdates.push({ stripeProduct, apiProduct });
      }
      if (!apiProduct.stripe_id || apiProduct.stripe_id === null) {
        stripeIdUpdates.push({ stripeProduct, apiProduct });
      }
    }
  });
  /* STRIPE NÃO PERMITE ATUALIZAÇÃO DE PREÇOS */
  /* await updateStripeProductPrice(priceUpdates); */
  await updateStripeProductName(namesUpdate);
  await updateStripeDescriptionProducts(descriptionUpdates);

  // Atualizando stripe_id para os produtos que precisam
  for (const { stripeProduct, apiProduct } of stripeIdUpdates) {
    await updateApiProductStripeId(apiProduct._id, stripeProduct.id);
    console.log(`Stripe ID for product ${apiProduct.name} updated.`);
  }
};



const deleteDiferentsStripeProducts = async (excessProducts) => {
  for (let product of excessProducts) {
    try {
      await stripe.products.update(product.id, { active: false });
      console.log(`Product ${product.name} deleted.`);
    } catch (error) {
      console.error(`Error deleting product ${product.name}:`, error);
    }
  }
};

const synchronizeProducts = (stripeProducts, formattedAPIProducts) => {
  const excess = getProductsNotInSecondList(stripeProducts, formattedAPIProducts);
  getUpdatedProducts(stripeProducts, formattedAPIProducts);
  excess.length > 0 && deleteDiferentsStripeProducts(excess);
};

export const formatTheApiProductsToCompare = (products) => {
  return products.map(p => {
    const { title, price, image, description, stripe_id, _id } = p;
    return {
      id: stripe_id,
      _id,
      name: title,
      default_price: price,
      price,
      currency: 'brl',
      images: [image],
      image: image,
      description,
      stripe_id,
    };
  });
};

export const formatTheApiProductsToPayment = (products) => {
  const prdcts = formatTheApiProductsToCompare(products);
  return prdcts.map(p => {
    const id = p.stripe_id;
    const { price } = p;
    return {
      price_data: { currency: "brl", unit_amount: price * 100, product_data: {...p, id} },
      quantity: 1
    };
  });
};

export const formatTheStripeProductsToCompare = (ps) => {
  console.log(ps);
  return ps.map(p => {
    const { name, default_price, images, description } = p;
    return {
      id: p.id.toString(),
      name,
      price: default_price?.unit_amount_decimal || '00,00',
      currency: default_price?.currency || 'brl',
      images,
      image: images[0] || "",
      description: description || ""
    };
  });
};

export const formatTheApiProductsToCreate = (p) => {
  const { name, default_price, images, description } = p;
  return {
    name: name,
    default_price_data: {
      currency: "brl",
      unit_amount: default_price * 100
    },
    images,
    description
  };
};

export default async function syncAPIProductsWithStripe(stripeProducts, APIProducts) {
  const formattedAPIProducts = formatTheApiProductsToCompare(APIProducts);

  if (stripeProducts.length < formattedAPIProducts.length) {
    const excess = getProductsNotInSecondList(formattedAPIProducts, stripeProducts);
    const promises = excess.map(async (p) => {
      const product = formatTheApiProductsToCreate(p);
      try {
        await stripe.products.create(product);
      } catch (error) {
        console.error(`Error creating product ${product.name}:`, error);
      }
    });

    await Promise.all(promises);
  } else {
    return synchronizeProducts(stripeProducts, formattedAPIProducts);
  }
}

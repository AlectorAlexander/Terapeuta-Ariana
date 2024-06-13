import draftToHtml from 'draftjs-to-html';

export default function convertFromRawToHtmlContent(response) {
  if (response.content) {
    const rawContentState = JSON.parse(response.content);
    const htmlContent = draftToHtml(rawContentState);
    return {
      title: response.title,
      content: htmlContent,
      image: response.image,
      _id: response._id,
    };
  } else {
    const rawContentState = JSON.parse(response.description);
    const htmlContent = draftToHtml(rawContentState);
    return {
      title: response.title,
      description: htmlContent,
      image: response.image,
      duracao: response.duracao,
      price: response.price,
      _id: response._id,
      stripe_id: response.stripe_id
    };
  }
}

import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

export default function convertFromRawToHtmlContent (response) {
  if (response.content) {
    const contentState = convertFromRaw(JSON.parse(response.content));
    const htmlContent = stateToHTML(contentState);
    return {
      title: response.title,
      content: htmlContent,
      image: response.image,
      _id: response._id,
    };
  } else {
    const contentState = convertFromRaw(JSON.parse(response.description));
    const htmlContent = stateToHTML(contentState);
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
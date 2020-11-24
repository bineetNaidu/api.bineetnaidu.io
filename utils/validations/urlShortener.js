import Joi from 'joi';

export default Joi.object({
  url: Joi.string().required().domain(),
  slug: Joi.string().max(10),
});

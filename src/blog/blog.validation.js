import Joi from "joi";

export class BlogValidation {
  /**
   * This method help creates a new blog in the dattabase.
   * @param {object} blogDetails - an object containing new blog details
   * @return {object} - returns an object containing error || value
   */
  static Create(blogDetails) {
    const { title, content, date } = blogDetails;
    const schema = Joi.object({
      title: Joi.string().required(),

      content: Joi.string().required(),

      date: Joi.date().required(),
    });

    const { error, value } = schema.validate({ title, content, date });
    return { error, value };
  }

  static PostComment(blogDetails) {
    const { name, comment, parentId } = blogDetails;
    const schema = Joi.object({
      name: Joi.string().required(),
      parentId: Joi.string().required(),
      comment: Joi.string().required(),
    });

    const { error, value } = schema.validate({ name, comment, parentId });
    return { error, value };
  }
}

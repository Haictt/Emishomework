/**
 * Enums
 */
const MISAEnum = {
  HttpStatusCode: {
    Success: 200,
    CreatedSuccess: 201,
    NoContent: 204,
    BadRequest: 400,
    NoAuthen: 401,
    NotFound: 404,
    Conflict: 409,
    ServerError: 500,
  },
  ExerciseStatus: {
    Composed: 1,
    Composing: 0,
  },
  QuestionType: {
    Choose: 1,
    Truefalse: 2,
    Fillin: 3,
    Write: 4,
  },
  AnswerStatus: {
    True: 1,
    False: 0,
  },
};
export default MISAEnum;

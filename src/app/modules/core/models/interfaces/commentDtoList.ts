import {UserDto} from "./userDto";
import {BookForCommentDto} from "./bookForCommentDto";

export interface CommentDtoList {

  id:number;
  content: string;
  userDto: UserDto;
  bookForCommentDto: BookForCommentDto;
}

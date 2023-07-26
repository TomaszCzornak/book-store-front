import { AuthorDto } from './authorDto';
import { Publisher } from '../enums/publisher';

export interface BookForCommentDto {
  id: number;
  title: string;
  authorDto: AuthorDto;
  publisher: Publisher;
}

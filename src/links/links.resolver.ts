import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { LinksService } from './links.service';
import { Link } from './model/links.model';

@Resolver()
export class LinksResolver {
  constructor(private linkService: LinksService) {}

  @Query(() => [Link])
  async links(): Promise<Link[]> {
    const links = await this.linkService.findAll();
    return links.data;
  }

  @Mutation(() => Link)
  async createLink(
    @Args('data') createLinkInput: CreateLinkDto,
  ): Promise<Link> {
    const createdLink = await this.linkService.create(createLinkInput);
    return createdLink.data;
  }

  @Mutation(() => Link)
  async updateLink(
    @Args('id') id: string,
    @Args('data') updateLinkInput: UpdateLinkDto,
  ): Promise<Link> {
    const updatedLink = await this.linkService.update(id, updateLinkInput);
    return updatedLink.data;
  }

  @Mutation(() => Boolean)
  async deleteLink(@Args('id') id: string): Promise<boolean> {
    const deletedLink = await this.linkService.remove(id);
    return !!deletedLink.deleted_link_id;
  }
}

import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { HasPermissionGuard } from '../privilege/has-permission.guard';
import { RequirePrevilages } from '../privilege/privilege.decorator';
import { AuthGuard } from '../shared/guards/auth.guard';
import { UserPrivilege } from '../shared/types';
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
  @RequirePrevilages(UserPrivilege.LINKS_WRITE)
  @UseGuards(AuthGuard, HasPermissionGuard)
  async createLink(
    @Args('data') createLinkInput: CreateLinkDto,
  ): Promise<Link> {
    const createdLink = await this.linkService.create(createLinkInput);
    return createdLink;
  }

  @Mutation(() => Link, { nullable: true })
  @RequirePrevilages(UserPrivilege.LINKS_WRITE)
  @UseGuards(AuthGuard, HasPermissionGuard)
  async updateLink(
    @Args('id') id: string,
    @Args('data') updateLinkInput: UpdateLinkDto,
  ): Promise<Link> {
    const updatedLink = await this.linkService.update(id, updateLinkInput);
    return updatedLink;
  }

  @Mutation(() => Boolean)
  @RequirePrevilages(UserPrivilege.LINKS_DELETE)
  @UseGuards(AuthGuard, HasPermissionGuard)
  async deleteLink(@Args('id') id: string): Promise<boolean> {
    const deletedLink = await this.linkService.remove(id);
    return deletedLink;
  }
}

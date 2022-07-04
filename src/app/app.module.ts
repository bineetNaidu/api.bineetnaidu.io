import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from '../database/database.module';
import { LinksModule } from '../links/links.module';
import { MaplifyModule } from '../maplify/maplify.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req, res }) => ({ res, req }),
    }),
    UserModule,
    LinksModule,
    MaplifyModule,
  ],
})
export class AppModule {}

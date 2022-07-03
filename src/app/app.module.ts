import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { LinksModule } from 'src/links/links.module';
import { MaplifyModule } from 'src/maplify/maplify.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
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

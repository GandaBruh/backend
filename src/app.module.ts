import { DynamicModule, Module, Type } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { PostModule } from './post/post.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: ([
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
  })] as unknown as Array<DynamicModule | Type<any>>)
  .concat([
    AuthenticationModule,
    PostModule
  ]),
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

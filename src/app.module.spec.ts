import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppModule', () => {
  let appModule: TestingModule;

  beforeAll(async () => {
    appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(appModule).toBeDefined();
  });

  it('should have the AppController', () => {
    const appController = appModule.get<AppController>(AppController);
    expect(appController).toBeDefined();
  });

  it('should have the AppService', () => {
    const appService = appModule.get<AppService>(AppService);
    expect(appService).toBeDefined();
  });
});

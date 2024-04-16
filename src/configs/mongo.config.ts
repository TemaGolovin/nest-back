import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions } from "@nestjs/mongoose";

export const getMongoConfig = (configService: ConfigService): MongooseModuleOptions => {
  return {
    uri: getMongooseUrl(configService),
    ...getMongoOptions(),
  };
};

const getMongooseUrl = (configService: ConfigService) =>
  "mongodb://" +
  configService.get("MONGO_LOGIN") + ":" +
  configService.get("MONGO_PASSWORD") + "@" +
  configService.get("MONGO_HOST") + ":" +
  configService.get("MONGO_PORT") + "/" +
  configService.get("MONGO_AUTHDB");

const getMongoOptions = () => ({});
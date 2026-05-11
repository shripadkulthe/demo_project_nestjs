import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, MetadataScanner } from '@nestjs/core';
import { MESSAGE_MAPPING_METADATA, MESSAGE_METADATA, GATEWAY_METADATA } from '@nestjs/websockets/constants';
  
@Injectable()
export class GatewayDiscoveryService implements OnModuleInit {

  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
  ) {}

  onModuleInit() {

    console.log('\n[DiscoveryService] Scanning gateways...\n');

    const providers = this.discoveryService.getProviders();

    providers.forEach((wrapper) => {

      const instance = wrapper.instance;

      if (!instance) return;

      const isGateway = Reflect.getMetadata(
        GATEWAY_METADATA,
        instance.constructor,
      );

      if (!isGateway) return;

      const prototype = Object.getPrototypeOf(instance);

      if (!prototype) return;

      const gatewayName = instance.constructor.name;

      const methods =
        this.metadataScanner.getAllMethodNames(prototype);

      methods.forEach((methodName) => {

        const methodRef = prototype[methodName];

        const isMessageHandler = Reflect.getMetadata(
          MESSAGE_MAPPING_METADATA,
          methodRef,
        );

        if (!isMessageHandler) return;

        const event = Reflect.getMetadata(
          MESSAGE_METADATA,
          methodRef,
        );

        if (!event) return;

        console.log(`[Gateway] ${gatewayName}`);
        console.log(`Event: "${event}"`);
        console.log(`Handler: ${methodName}()\n`);
      });
    });
  }
}
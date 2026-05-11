import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { GatewayDiscoveryService } from './gateway-discovery.service';

@Module({
  imports: [DiscoveryModule],
  providers: [GatewayDiscoveryService],
})
export class GatewayExplorerModule {}
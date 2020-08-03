import { Module } from '@nestjs/common'
import { Routes, RouterModule } from 'nest-router'
import { ProductsModule } from './products/products.module'
import { UnitsModule } from './products/units/unit.module'
import { SkumasterModule } from './products/skumaster/skumaster.module'
import { DashboardModule } from './products/dashboard/dashboard.module'
import { PosModule } from './pos/pos.module'
import { Pos001Module } from './pos/pos001/pos001.module'
import { Pos002Module } from './pos/pos002/pos002.module'
import { Pos003Module } from './pos/pos003/pos003.module'
import { Pos004Module } from './pos/pos004/pos004.module'
import { Pos005Module } from './pos/pos005/pos005.module'
import { Pos006Module } from './pos/pos006/pos006.module'
import { UpdateModule } from './products/update/update.module'
import { DataModule } from './products/update/data/data.module'

const routes: Routes = [
  {
    path: '/products',
    module: ProductsModule,
    children: [
      {
        path: '/unit',
        module: UnitsModule,
      },
      {
        path: '/skumaster',
        module: SkumasterModule,
      },
      {
        path: '/dashboard',
        module: DashboardModule,
      },
      {
        path: '/update',
        module: UpdateModule,
        children: [
          {
            path: '/data',
            module: DataModule,
          },
        ],
      },
    ],
  },
  {
    path: '/pos',
    module: PosModule,
    children: [
      {
        path: '/001',
        module: Pos001Module,
      },
      {
        path: '/002',
        module: Pos002Module,
      },
      {
        path: '/003',
        module: Pos003Module,
      },
      {
        path: '/004',
        module: Pos004Module,
      },
      {
        path: '/005',
        module: Pos005Module,
      },
      {
        path: '/006',
        module: Pos006Module,
      },
    ],
  },
]

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    ProductsModule,
    UnitsModule,
    SkumasterModule,
    DashboardModule,
    PosModule,
    UpdateModule,
    DataModule,
  ],
  controllers: [],
  providers: [],
})
export class RoutesModule {}

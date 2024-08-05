import { aptosClient } from "@/utils/aptosClient";

export type FungibleAssetMetadata = Awaited<ReturnType<ReturnType<typeof aptosClient>['getFungibleAssetMetadata']>>[0];

export type FungibleAssetBalance = Omit<Awaited<ReturnType<ReturnType<typeof aptosClient>['getCurrentFungibleAssetBalances']>>[0], 'amount'> & { amount: number };

export type FungibleAssetBalanceWithMetadata = FungibleAssetBalance & { metadata: FungibleAssetMetadata | undefined };

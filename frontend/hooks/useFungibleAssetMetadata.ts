import { FungibleAssetMetadata } from "@/types/aptos";
import { aptosClient } from "@/utils/aptosClient";
import { useCallback, useEffect, useState } from "react";

const useFungibleAssetMetadata = (assetTypes: string[]): { [assetType: string]: FungibleAssetMetadata } => {

  const [metadata, setMetadata] = useState<{ [assetType: string]: FungibleAssetMetadata }>({});

  const updateMetadata = useCallback(async () => {
      const data = await aptosClient().getFungibleAssetMetadata({ options: { where: { asset_type: { _in: assetTypes } } } });
      const mappedData = data.reduce<{ [assetType: string]: FungibleAssetMetadata }>((acc, item) => {
        return { ...acc, [item.asset_type]: item };
      }, {})

      setMetadata(mappedData);
  }, [assetTypes]);

  useEffect(() => {
    updateMetadata();
  }, [updateMetadata]);

  return metadata;
}

export default useFungibleAssetMetadata;
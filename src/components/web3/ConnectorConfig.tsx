import "@rainbow-me/rainbowkit/styles.css";

import React, { PropsWithChildren } from "react";
import { getDefaultWallets, RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [chain.mainnet],
  [publicProvider()]
);



const { connectors } = getDefaultWallets({
  appName: "EGC Stake",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export function Web3ConnectorConfig({ children }: PropsWithChildren) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        theme={darkTheme({
          accentColor: "#FF9200",
          accentColorForeground: "white",
          borderRadius: "large",
          overlayBlur: "large",
          fontStack: "rounded",
        })}
        coolMode
        chains={chains}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

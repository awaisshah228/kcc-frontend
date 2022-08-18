import "@rainbow-me/rainbowkit/styles.css";

import React, { PropsWithChildren } from "react";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  Chain,
} from "@rainbow-me/rainbowkit";

// import { Chain, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

// const kccChain: Chain = {
//   id: 321,
//   name: "KCC",
//   network: "KCC-MAINNET",
//   iconUrl: "https://example.com/icon.svg",
//   iconBackground: "#fff",
//   nativeCurrency: {
//     decimals: 18,
//     name: "KCC",
//     symbol: "KCS",
//   },
//   rpcUrls: {
//     default: "https://rpc-mainnet.kcc.network",
//   },
//   blockExplorers: {
//     default: { name: "KCC Explorer", url: "https://explorer.kcc.io/en" },
//     // etherscan: { name: "SnowTrace", url: "https://snowtrace.io" },
//   },
//   testnet: false,
// };
const kccChainTest: Chain = {
  id: 322,
  name: "KCC-TEST",
  network: "KCC-TESTNET",
  iconUrl: "https://example.com/icon.svg",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "KCC",
    symbol: "KCS",
  },
  rpcUrls: {
    default: "https://rpc-testnet.kcc.network",
  },
  blockExplorers: {
    default: { name: "Scan Testnet", url: "https://scan-testnet.kcc.network" },
    // etherscan: { name: "SnowTrace", url: "https://snowtrace.io" },
  },
  testnet: true,
};

const { provider, chains } = configureChains(
  [kccChainTest],
  [jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default }) })]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
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

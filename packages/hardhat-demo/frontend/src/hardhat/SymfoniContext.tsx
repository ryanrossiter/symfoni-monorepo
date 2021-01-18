/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { providers, Signer, ethers } from "ethers";
import React, { useEffect, useState } from "react";
import Web3Modal, { IProviderOptions } from "web3modal";
import SimpleStorageADeployment from "./deployments/localhost/SimpleStorageA.json";
import SimpleStorageBDeployment from "./deployments/localhost/SimpleStorageB.json";
import { SimpleStorage } from "./typechain/SimpleStorage";
import { SimpleStorage__factory } from "./typechain/factories/SimpleStorage__factory";
import { SimpleStorage2 } from "./typechain/SimpleStorage2";
import { SimpleStorage2__factory } from "./typechain/factories/SimpleStorage2__factory";
import WalletConnectProvider from "@walletconnect/web3-provider";

const emptyContract = {
    instance: undefined,
    factory: undefined
};
const defaultProvider: providers.Provider | undefined = undefined;
export const ProviderContext = React.createContext<[providers.Provider | undefined, React.Dispatch<React.SetStateAction<providers.Provider | undefined>>]>([defaultProvider, () => { }]);
const defaultCurrentAddress: string = "";
export const CurrentAddressContext = React.createContext<[string, React.Dispatch<React.SetStateAction<string>>]>([defaultCurrentAddress, () => { }]);
const defaultSigner: Signer | undefined = undefined;
export const SignerContext = React.createContext<[Signer | undefined, React.Dispatch<React.SetStateAction<Signer | undefined>>]>([defaultSigner, () => { }]);
const defaultSymfoniContext: SymfoniContextInterface = {
    currentHardhatProvider: "",
    init: () => { throw Error("Symfoni context not initialized") },
    loading: false,
    messages: [],
    providers: []
};
export const SymfoniContext = React.createContext<SymfoniContextInterface>(defaultSymfoniContext);
export const SimpleStorageAContext = React.createContext<SymfoniSimpleStorage>(emptyContract);
export const SimpleStorageBContext = React.createContext<SymfoniSimpleStorage>(emptyContract);
export const SimpleStorageContext = React.createContext<SymfoniSimpleStorage>(emptyContract);
export const SimpleStorage2Context = React.createContext<SymfoniSimpleStorage2>(emptyContract);

export interface SymfoniContextInterface {
    init: (provider?: string) => void;
    loading: boolean;
    messages: string[];
    currentHardhatProvider: string;
    providers: string[];
}

export interface SymfoniProps {
    autoInit?: boolean;
    showLoading?: boolean;
    loadingComponent?: React.ReactNode;
}

export interface SymfoniSimpleStorage {
    instance?: SimpleStorage;
    factory?: SimpleStorage__factory;
}

export interface SymfoniSimpleStorage {
    instance?: SimpleStorage;
    factory?: SimpleStorage__factory;
}

export interface SymfoniSimpleStorage {
    instance?: SimpleStorage;
    factory?: SimpleStorage__factory;
}

export interface SymfoniSimpleStorage2 {
    instance?: SimpleStorage2;
    factory?: SimpleStorage2__factory;
}

export const Symfoni: React.FC<SymfoniProps> = ({
    showLoading = true,
    autoInit = true,
    ...props
}) => {
    const [initializeCounter, setInitializeCounter] = useState(0);
    const [currentHardhatProvider, setCurrentHardhatProvider] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [signer, setSigner] = useState<Signer | undefined>(defaultSigner);
    const [provider, setProvider] = useState<providers.Provider | undefined>(defaultProvider);
    const [currentAddress, setCurrentAddress] = useState<string>(defaultCurrentAddress);
    const [fallbackProvider] = useState<string | undefined>("brreg");
    const [providerPriority, setProviderPriority] = useState<string[]>(["hardhat", "brreg", "web3modal"]);
    const [SimpleStorageA, setSimpleStorageA] = useState<SymfoniSimpleStorage>(emptyContract);
    const [SimpleStorageB, setSimpleStorageB] = useState<SymfoniSimpleStorage>(emptyContract);
    const [SimpleStorage, setSimpleStorage] = useState<SymfoniSimpleStorage>(emptyContract);
    const [SimpleStorage2, setSimpleStorage2] = useState<SymfoniSimpleStorage2>(emptyContract);
    useEffect(() => {
        if (messages.length > 0)
            console.debug(messages.pop())
    }, [messages])

    const getProvider = async (): Promise<{ provider: providers.Provider, hardhatProviderName: string } | undefined> => {
        let hardhatProviderName = "Not set";
        let _providerPriority = [...providerPriority];
        // Fallback provider
        if (fallbackProvider && autoInit && initializeCounter === 0) {
            if (localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER") === null) {
                _providerPriority = _providerPriority.sort((a, b) => {
                    return a === fallbackProvider ? -1 : b === fallbackProvider ? 1 : 0;
                })
            }
        }
        const provider = await _providerPriority.reduce(async (maybeProvider: Promise<providers.Provider | undefined>, providerIdentification) => {
            let foundProvider = await maybeProvider
            if (foundProvider) {
                return Promise.resolve(foundProvider)
            }
            else {
                switch (providerIdentification.toLowerCase()) {
                    case "web3modal":
                        try {
                            const provider = await getWeb3ModalProvider()
                            const web3provider = new ethers.providers.Web3Provider(provider);
                            hardhatProviderName = "web3modal";
                            return Promise.resolve(web3provider)
                        } catch (error) {
                            return Promise.resolve(undefined)
                        }
                    case "hardhat":
                        try {
                            const provider = new ethers.providers.JsonRpcProvider({
                                url: "http://127.0.0.1:8545",
                            });
                            hardhatProviderName = "hardhat";
                            return Promise.resolve(provider)
                        } catch (error) {
                            return Promise.resolve(undefined)
                        } case "brreg":
                        try {
                            const provider = new ethers.providers.JsonRpcProvider({
                                url: "https://u1txh1ent0-u1ieecy018-rpc.us1-azure.kaleido.io",
                                user: "u1qdua80h5",
                                password: "Er0LWdZuKqOza22YNQKhtdFCbqRzhzGCRhuZgrtHZ9s"
                            });
                            hardhatProviderName = "brreg";
                            return Promise.resolve(provider)
                        } catch (error) {
                            return Promise.resolve(undefined)
                        } default:
                        return Promise.resolve(undefined)
                }
            }
        }, Promise.resolve(undefined)) // end reduce
        return provider ? { provider, hardhatProviderName } : undefined
    };
    const getSigner = async (_provider: providers.Provider, hardhatProviderName: string): Promise<Signer | undefined> => {
        switch (hardhatProviderName) {
            case "web3modal":
                const web3provider = _provider as ethers.providers.Web3Provider
                return await web3provider.getSigner()
            case "hardhat":
                return ethers.Wallet.fromMnemonic("test test test test test test test test test test test junk").connect(_provider)
            case "brreg":
                return ethers.Wallet.fromMnemonic("shrug antique orange tragic direct drop abstract ring carry price anchor train").connect(_provider)
            case "brregStage":
                return ethers.Wallet.fromMnemonic("shrug antique orange tragic direct drop abstract ring carry price anchor train").connect(_provider)
            default:
                return undefined
        }
    };
    const getWeb3ModalProvider = async (): Promise<any> => {
        const providerOptions: IProviderOptions = {
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    rpc: {
                        55577: "https://e0cteq8qnh:IY2scS2ywMZkinR5m4sS7GBs7EDgm4Mh9F1uUVkmKFI@e0qchlost7-e0zi3w4q2r-rpc.de0-aws.kaleido.io"
                    }
                }
            }
        };
        const web3Modal = new Web3Modal({
            // network: "mainnet",
            cacheProvider: true,
            providerOptions, // required
        });
        return await web3Modal.connect();
    };

    useEffect(() => {
        let subscribed = true
        const doAsync = async () => {
            const finish = (text: string) => {
                setLoading(false)
                setMessages(old => [...old, text])
            }
            const finishWithContracts = (text: string) => {
                setSimpleStorageA(getSimpleStorageA(_provider, _signer))
                setSimpleStorageB(getSimpleStorageB(_provider, _signer))
                setSimpleStorage(getSimpleStorage(_provider, _signer))
                setSimpleStorage2(getSimpleStorage2(_provider, _signer))
                finish(text)
            }
            if (!autoInit && initializeCounter === 0) return finish("Auto init turned off.")
            setLoading(true)
            setMessages(old => [...old, "Initiating Symfoni React"])
            const providerObject = await getProvider() // getProvider can actually return undefined, see issue https://github.com/microsoft/TypeScript/issues/11094

            if (!subscribed || !providerObject) return finish("No provider or signer.")
            const _provider = providerObject.provider
            setProvider(_provider)
            setMessages(old => [...old, "Useing " + providerObject.hardhatProviderName])
            setCurrentHardhatProvider(providerObject.hardhatProviderName)
            const _signer = await getSigner(_provider, providerObject.hardhatProviderName);

            if (!subscribed || !_signer) return finishWithContracts("Provider, without signer.")
            setSigner(_signer)
            setMessages(old => [...old, "Useing signer"])
            const address = await _signer.getAddress()

            if (!subscribed || !address) return finishWithContracts("Provider and signer, without address.")
            setCurrentAddress(address)

            return finishWithContracts("Completed Symfoni context initialization.")
        };
        doAsync();
        return () => { subscribed = false }
    }, [initializeCounter])

    const getSimpleStorageA = (_provider: providers.Provider, _signer?: Signer) => {

        const contractAddress = SimpleStorageADeployment.receipt.contractAddress
        const instance = _signer ? SimpleStorage__factory.connect(contractAddress, _signer) : SimpleStorage__factory.connect(contractAddress, _provider)
        const contract: SymfoniSimpleStorage = {
            instance: instance,
            factory: _signer ? new SimpleStorage__factory(_signer) : undefined,
        }
        return contract
    }
        ;
    const getSimpleStorageB = (_provider: providers.Provider, _signer?: Signer) => {

        const contractAddress = SimpleStorageBDeployment.receipt.contractAddress
        const instance = _signer ? SimpleStorage__factory.connect(contractAddress, _signer) : SimpleStorage__factory.connect(contractAddress, _provider)
        const contract: SymfoniSimpleStorage = {
            instance: instance,
            factory: _signer ? new SimpleStorage__factory(_signer) : undefined,
        }
        return contract
    }
        ;
    const getSimpleStorage = (_provider: providers.Provider, _signer?: Signer) => {
        let instance = _signer ? SimpleStorage__factory.connect(ethers.constants.AddressZero, _signer) : SimpleStorage__factory.connect(ethers.constants.AddressZero, _provider)
        const contract: SymfoniSimpleStorage = {
            instance: instance,
            factory: _signer ? new SimpleStorage__factory(_signer) : undefined,
        }
        return contract
    }
        ;
    const getSimpleStorage2 = (_provider: providers.Provider, _signer?: Signer) => {
        let instance = _signer ? SimpleStorage2__factory.connect(ethers.constants.AddressZero, _signer) : SimpleStorage2__factory.connect(ethers.constants.AddressZero, _provider)
        const contract: SymfoniSimpleStorage2 = {
            instance: instance,
            factory: _signer ? new SimpleStorage2__factory(_signer) : undefined,
        }
        return contract
    }
        ;

    const handleInitProvider = (provider?: string) => {
        console.log("running")
        if (provider) {
            setProviderPriority(old => old.sort((a, b) => {
                return a === provider ? -1 : b === provider ? 1 : 0;
            }))
        }
        setInitializeCounter(initializeCounter + 1)
    }
    return (
        <SymfoniContext.Provider value={{ init: (provider) => handleInitProvider(provider), providers: providerPriority, currentHardhatProvider, loading, messages }}>
            <ProviderContext.Provider value={[provider, setProvider]}>
                <SignerContext.Provider value={[signer, setSigner]}>
                    <CurrentAddressContext.Provider value={[currentAddress, setCurrentAddress]}>
                        <SimpleStorageAContext.Provider value={SimpleStorageA}>
                            <SimpleStorageBContext.Provider value={SimpleStorageB}>
                                <SimpleStorageContext.Provider value={SimpleStorage}>
                                    <SimpleStorage2Context.Provider value={SimpleStorage2}>
                                        {showLoading && loading ?
                                            props.loadingComponent
                                                ? props.loadingComponent
                                                : <div>
                                                    {messages.map((msg, i) => (
                                                        <p key={i}>{msg}</p>
                                                    ))}
                                                </div>
                                            : props.children
                                        }
                                    </SimpleStorage2Context.Provider >
                                </SimpleStorageContext.Provider >
                            </SimpleStorageBContext.Provider >
                        </SimpleStorageAContext.Provider >
                    </CurrentAddressContext.Provider>
                </SignerContext.Provider>
            </ProviderContext.Provider>
        </SymfoniContext.Provider>
    )

};

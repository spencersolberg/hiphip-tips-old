export const getICANNTLDS = async (): Promise<string[]> => {
    const response = await fetch("https://data.iana.org/TLD/tlds-alpha-by-domain.txt");
    const text = await response.text();

    let tlds = text.split(/\r?\n/);
    delete tlds[0];

    return tlds;
}
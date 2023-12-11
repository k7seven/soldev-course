import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

try {
    const publicKey = new PublicKey("32aACc6juo8ge4JWqsojhqWE1Q512UJggfELdeed2Bjb");

    const connection = new Connection("https://api.devnet.solana.com", "confirmed");

    const balanceInLamports = await connection.getBalance(publicKey);

    const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

    console.log(
        `💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`
    );

} catch (e) {
    console.log("Public key provided not valid!");
}

import web3 from "@solana/web3.js";
import * as dotenv from "dotenv";
import { getKeypairFromEnvironment } from "@solana-developers/node-helpers"

dotenv.config();

const RECEIPIENT_ADDRESS = new web3.PublicKey('A7LJvtktbAR2vpXon2b9rjKDHpBiZAdyXfMMfSVpzQ1e')

const payer = getKeypairFromEnvironment('SECRET_KEY')
const connection = new web3.Connection(web3.clusterApiUrl('devnet'))

const TOKEN_PROGRAM_ADDRESS = new web3.PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')

async function sendSolTransaction(connection: web3.Connection, payer: web3.Keypair) {
    const transaction = new web3.Transaction()

    const tokenProgramId = new web3.PublicKey(RECEIPIENT_ADDRESS)

    const instruction = new web3.TransactionInstruction({
        keys: [
            {
                pubkey: RECEIPIENT_ADDRESS,
                isSigner: false,
                isWritable: true
            },
        ],
        tokenProgramId
    })

    transaction.add(instruction)

    const signature = await web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [payer]
    )

    console.log(`You can view your transaction on the Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)
}

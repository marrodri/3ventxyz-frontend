import { useContractRead } from 'wagmi'
import { useAuth } from '../contexts/auth'
import abi from './abi.json'

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

export default function TokenOwnership() {
  const auth = useAuth()
  /*Check if wallet is connected*/
  if (auth.userModel?.wallet) {
    /*use Contract Read and check tokens owned*/
    if (contractAddress !== undefined) {
      const { data, isError, isLoading } = useContractRead({
        addressOrName: contractAddress,
        contractInterface: abi,
        functionName: 'balanceOf',
        args: [auth.userModel?.wallet],
        onSuccess(data) {
          /*Function to do something if token is owned or not*/
          if (data._hex !== '0x00') {
            console.log('token owned in contract')
          } else {
            console.log('no token owned in contract')
          }
        },
        onError(error) {
          console.log('Error', error)
        }
      })
    }
  }

  return (
    <div>
      {auth.userModel?.wallet ? (
        <div>Connected to wallet</div>
      ) : (
        <div>Please verify and connect your wallet</div>
      )}
    </div>
  )
}
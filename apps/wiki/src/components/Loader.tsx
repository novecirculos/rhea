import { Loading } from 'react-loading-dot'
const Loader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loading dots={3} background="#C22929" />
    </div>
  )
}

export default Loader

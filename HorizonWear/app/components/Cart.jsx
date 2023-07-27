const Cart = (props) => {
  return (
    <div class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
    <div class="flex flex-col rounded-lg bg-white sm:flex-row">
      <img
        class="m-2 h-24 w-28 rounded-md border object-cover object-center"
        src={props.image}
        alt=""
      />
      <div class="flex w-full flex-col px-4 py-4">
        <span class="font-semibold">
        {props.title}
        </span>
        <span class="float-right text-gray-400">{props.category}</span>
        <span class="float-right text-gray-400">Qty. {props.quantity}</span>
        <p class="text-lg font-bold">Rs. {props.price}</p>
      </div>
    </div>
  </div>
  )
}

export default Cart
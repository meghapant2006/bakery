export default function OrderSuccess() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-4">
        <div className="text-5xl">🎉</div>
        <h1 className="text-3xl font-bold">Order Placed Successfully</h1>
        <p className="text-muted-foreground">
          Thank you for your order! Were getting your fresh bakes ready. Youll receive an update shortly.
        </p>
        <a href="/">
          <button className="inline-flex justify-center items-center rounded-md bg-primary text-primary-foreground px-6 py-3 font-medium hover:bg-primary/90">
            Back to Home
          </button>
        </a>
      </div>
    </div>
  )
}

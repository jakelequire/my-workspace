
import Test from "./test";

export default function Dev() {
    return (
      <main style={style}>
        <Test />
      </main>
    );
  }

const style = {
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    backgroundColor: '#1b1b1b',
}
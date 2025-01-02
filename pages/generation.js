export default function Generation() {
    return (
      <div className="w-full flex">
        <aside className="w-[55%] bg-gray-100 p-4">
          <p>Sidebar content</p>
        </aside>
        <main className="w-[37.5%] bg-white p-4 shadow-md">
          <p>Main content area</p>
        </main>
      </div>
    );
  }
  
const MainContent = ({ children }: any) => {
  return (
    <main className="p-4 sm:ml-64">
      <div className="flex flex-col p-8 min-h-48 mb-4 rounded bg-white dark:bg-gray-800 space-y-4">
        {children}
      </div>
    </main>
  )
}
export default MainContent
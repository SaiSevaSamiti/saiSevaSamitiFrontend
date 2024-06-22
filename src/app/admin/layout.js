import AdminNavbar from './AdminNavbar'

export default function RootLayout({ children }) {
  return (
    <div className="flex">
      <AdminNavbar />
      <div className="w-full">{children}</div>
    </div>
  )
}

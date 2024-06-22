'use client'

import API from '@/axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const { push } = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const email = formData.get('email')
    const password = formData.get('password')

    try {
      const res = await API.post('/users/auth', {
        email,
        password,
      })
      const { user, accessToken } = await res.data

      if (res.status === 200) {
        document.cookie = `userId=${encodeURIComponent(user._id)}; path=/;`
        document.cookie = `accessToken=${encodeURIComponent(
          accessToken
        )}; path=/;`
        toast({
          title: 'Login Successful',
        })

        push('/admin/users')
      }
    } catch (error) {
      console.log(error)
      toast({
        title: 'Login Failed',
        description: 'Invalid Credentials',
      })
    }
  }

  return (
    <div className="h-[100vh] w-full flex flex-col justify-center items-center dark:text-primary-base">
      <div className="border-2 border-primary-base/10 p-8 rounded-lg">
        <div className="flex justify-center py-4">
          <h1>Admin Login</h1>
        </div>
        <div className="">
          <form onSubmit={handleLogin} className="">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="my-2"
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="my-2"
            />
            <Button type="submit" className="my-2">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

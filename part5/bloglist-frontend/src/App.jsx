import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs)
    })

    axios.get('http://localhost:5173/__cypress/assets/favicon.png?v2')
      .then(response => {
        // 假设我们需要将图片 URL 设置为 vite.svg
        const imageUrl = '/vite.svg'
        console.log('Image URL:', imageUrl)
        // 你可以在这里处理 imageUrl，例如将其设置为某个状态或直接在组件中使用
      })
      .catch(error => {
        console.error('Error fetching image:', error)
      })
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification('Login successful')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification('Wrong credentials')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setBlogs([])
    setNotification('Logout successful')
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleAddBlog = async (newBlog) => {
    //event.preventDefault()
    try {
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      setNewBlog({ title: '', author: '', url: '' })
      setNotification(`A new blog "${blog.title}" by ${blog.author} added`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification('Error adding blog')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }
  const updateBlog = (updatedBlog) => {
    setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog));
  };
  const removeBlog = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
  };
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm handleAddBlog={handleAddBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} user={user} />
      )}
    </div>
  )
}

export default App
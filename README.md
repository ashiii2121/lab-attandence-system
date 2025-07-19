# Lab Attendance System 🧪

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/>
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
</p>

A modern web-based lab attendance management system designed for tracking student entry and exit times in laboratory sessions. Built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Student Check-in**: Students can register their entry by providing their name
- **Token-based System**: Unique token generation for each student session
- **Exit Management**: Students can check out using their assigned token number
- **Admin Dashboard**: View attendance records and manage lab sessions
- **Real-time Clock**: Live time display on all pages
- **Responsive Design**: Modern UI with FontAwesome icons and CSS animations
- **MongoDB Integration**: Persistent data storage for attendance records

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: EJS templating engine, HTML5, CSS3, JavaScript
- **Icons**: FontAwesome 6.0
- **Development**: Nodemon for auto-restart

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (running locally on port 27017)
- npm (comes with Node.js)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ashiii2121/lab-attandence-system.git
   cd lab-attandence-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start MongoDB**
   Make sure MongoDB is running on your local machine:
   ```bash
   mongod
   ```

4. **Run the application**
   ```bash
   npm start
   ```

5. **Access the application**
   Open your browser and navigate to: `http://localhost:5000`

## 📁 Project Structure

```
lab-attandence-system/
├── controllers/
│   └── control.js          # Application controllers
├── models/
│   └── model.js           # MongoDB schema definitions
├── routers/
│   └── route.js           # Express route definitions
├── views/
│   ├── main.ejs           # Home page
│   ├── start.ejs          # Student check-in page
│   ├── exit.ejs           # Student check-out page
│   ├── token.ejs          # Token display page
│   └── admin.ejs          # Admin dashboard
├── public/
│   ├── *.css              # Stylesheets
│   ├── *.js               # Client-side JavaScript
│   └── images/            # Static images
├── connection.js          # MongoDB connection setup
├── index.js              # Main application entry point
└── package.json          # Project dependencies
```

## 🎯 Usage

### For Students

1. **Starting a Session**:
   - Click "Start Session" on the home page
   - Enter your name
   - Receive a unique token number
   - Keep the token number for checkout

2. **Ending a Session**:
   - Click "Exit Session" on the home page
   - Enter your token number
   - Confirm exit to record your departure time

### For Administrators

1. **Viewing Attendance**:
   - Access the admin panel via `/admin` route
   - View all attendance records with entry/exit times
   - Monitor current lab occupancy

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Home page |
| GET | `/start` | Student check-in page |
| GET | `/exit` | Student check-out page |
| GET | `/admin` | Admin dashboard |
| POST | `/create` | Create new attendance record |
| POST | `/exitpage` | Update exit time |

## 💾 Database Schema

The application uses a MongoDB collection with the following schema:

```javascript
{
  name: String (required),
  token: Number,
  Entry: Date (default: current time),
  Exit: Date (default: current time)
}
```

## 🎨 Design Credits

**Designed by LIVEWIRE Kasaragod | 2025**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🐛 Known Issues

- Admin dashboard currently shows static data
- Exit time functionality needs refinement
- Token validation could be enhanced

## 🔮 Future Enhancements

- [ ] Real-time admin dashboard updates
- [ ] Export attendance data to CSV/Excel
- [ ] Email notifications for attendance
- [ ] Student photo capture
- [ ] QR code integration
- [ ] Multiple lab support
- [ ] Attendance analytics and reports

## 📞 Support

Need any help? Reach out to the lab admin or create an issue in this repository.

## 🙏 Acknowledgments

- FontAwesome for the beautiful icons
- MongoDB team for the excellent database
- Express.js community for the robust framework

---

_This README was enhanced with ❤️ by Kilo Code._

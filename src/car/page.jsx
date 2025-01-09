import React, { Component } from "react";

class CarApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      newCar: { id: "", brand: "", model: "", year: "" },
      editingCarId: null,
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      newCar: { ...this.state.newCar, [name]: value },
    });
  };

  addCar = () => {
    const { cars, newCar } = this.state;
    if (!newCar.brand || !newCar.model || !newCar.year) {
      alert("Please fill out all fields!");
      return;
    }
    const newCarData = {
      ...newCar,
      id: new Date().getTime().toString(),
    };
    this.setState({
      cars: [...cars, newCarData],
      newCar: { id: "", brand: "", model: "", year: "" },
    });
  };

  startEditCar = (id) => {
    const carToEdit = this.state.cars.find((car) => car.id === id);
    this.setState({ newCar: { ...carToEdit }, editingCarId: id });
  };

  saveCar = () => {
    const { cars, newCar, editingCarId } = this.state;
    this.setState({
      cars: cars.map((car) => (car.id === editingCarId ? { ...newCar } : car)),
      newCar: { id: "", brand: "", model: "", year: "" },
      editingCarId: null,
    });
  };

  deleteCar = (id) => {
    const { cars } = this.state;
    this.setState({
      cars: cars.filter((car) => car.id !== id),
    });
  };

  render() {
    const { cars, newCar, editingCarId } = this.state;

    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6">
          <h1 className="text-2xl font-bold text-center mb-6">
            Car Information CRUD App
          </h1>

          {/* Form for adding/editing */}
          <div className="grid grid-cols-1 gap-4 mb-6">
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={newCar.brand}
              onChange={this.handleInputChange}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="model"
              placeholder="Model"
              value={newCar.model}
              onChange={this.handleInputChange}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="year"
              placeholder="Year"
              value={newCar.year}
              onChange={this.handleInputChange}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {editingCarId ? (
              <button
                onClick={this.saveCar}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
              >
                Save
              </button>
            ) : (
              <button
                onClick={this.addCar}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Add Car
              </button>
            )}
          </div>

          {/* Table displaying cars */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-black">Brand</th>
                  <th className="border border-gray-300 px-4 py-2 text-black">Model</th>
                  <th className="border border-gray-300 px-4 py-2 text-black">Year</th>
                  <th className="border border-gray-300 px-4 py-2 text-black">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.length > 0 ? (
                  cars.map((car) => (
                    <tr key={car.id} className="text-center">
                      <td className="border border-gray-300 px-4 py-2 text-black">
                        {car.brand}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-black">
                        {car.model}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-black">
                        {car.year}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-black">
                        <button
                          onClick={() => this.startEditCar(car.id)}
                          className="bg-yellow-500 text-white py-1 px-2 rounded-md hover:bg-yellow-600 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => this.deleteCar(car.id)}
                          className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-gray-500 py-4">
                      No cars available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default CarApp;

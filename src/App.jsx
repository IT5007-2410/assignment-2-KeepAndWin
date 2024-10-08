/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1, 
    name: 'Jack', 
    phone: 88885555,
    seatNumber: 1,
    bookingTime: new Date(),
  },
  {
    id: 2, 
    name: 'Rose', 
    phone: 88884444,
    seatNumber: 3,
    bookingTime: new Date(),
  },
];

var initialNum = initialTravellers.length;

function TravellerRow(props) {
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/}
  const traveller = props.traveller;
  return (
    <tr>
	  {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
      <td>{traveller.id}</td>
      <td>{traveller.name}</td>
      <td>{traveller.phone}</td>
      <td>{traveller.bookingTime.toLocaleString()}</td>
      <td>{traveller.seatNumber}</td>
    </tr>
  );
}

function Display(props) {
  
	/*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/
  const travellerRows = props.travellers.map(traveller => 
    <TravellerRow key={traveller.id} traveller={traveller} />
  );

  return (
    <table className="bordered-table">
      <thead>
        <tr>
	  {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Booking Time</th>
          <th>Seat Number</th>
        </tr>
      </thead>
      <tbody>
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
        {travellerRows}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    const form = document.forms.addTraveller;
    const traveller = {
      name: form.travellername.value,
      phone: form.travellerphone.value,
      seatNumber: parseInt(form.seatnumber.value)
    }
    this.props.bookTraveller(traveller);
    form.travellername.value = "";
    form.travellerphone.value = "";
    form.seatnumber.value = "";
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
	    {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <input type="text" name="travellername" placeholder="Name" />
        <input type="text" name="travellerphone" placeholder="Phone" />
        <input type="number" name="seatnumber" placeholder="Seat Number" />
        <button>Add</button>
      </form>
    );
  }
}


class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    const form = document.forms.deleteTraveller;
    const traveller = {
      name: form.travellername.value,
      seatNumber: parseInt(form.seatnumber.value)
    }
    this.props.deleteTraveller(traveller);
    form.travellername.value = "";
    form.seatnumber.value = "";
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
	    {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
        <input type="text" name="travellername" placeholder="Name" />
        <input type="number" name="seatnumber" placeholder="Seat Number" />
        <button>Delete</button>
      </form>
    );
  }
}

class Homepage extends React.Component {
	constructor() {
	super();
	}
	render(){
    var emptySeats = 10 - this.props.travellers.length;
    const seats = Array(10).fill().map((_, index) => {
      const isTaken = this.props.travellers.some(t => t.seatNumber === index + 1);
      return (
        <div key={index} style={{
          width: '50px', 
          height: '50px', 
          backgroundColor: isTaken ? 'grey' : 'green',
          display: 'inline-block',
          margin: '5px',
          textAlign: 'center',
          lineHeight: '50px',
          color: 'white'
        }}>
        {/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
        {index + 1}
      </div>);
	  });

    return (
      <div>
        <h2>Seats Status</h2>
        <h3>Number of Empty Seats: {emptySeats}</h3>
        {seats}
      </div>
    );
  }
}
class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: 1};
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
  }

  setSelector(value)
  {
  	/*Q2. Function to set the value of component selector variable based on user's button click.*/
    this.setState({ selector: value });
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(passenger) {
	    /*Q4. Write code to add a passenger to the traveller state variable.*/
      const newTravellers = this.state.travellers.slice();
      initialNum += 1;
      passenger.id = initialNum;
      passenger.bookingTime = new Date();
      newTravellers.push(passenger);
      this.setState({ travellers: newTravellers });
  }

  deleteTraveller(passenger) {
	  /*Q5. Write code to delete a passenger from the traveller state variable.*/
    var newTravellers = []
    this.state.travellers.forEach(traveller => {
      if (traveller.name !== passenger.name && traveller.seatNumber !== passenger.seatNumber) {
        newTravellers.push(traveller);
      }
    });
    this.setState({ travellers: newTravellers });
  }
  render() {
    return (
      <div>
        <h1>Ticket To Ride</h1>
	<div>
	    {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
      <button onClick={() => this.setSelector(1)}>Homepage</button>
      <button onClick={() => this.setSelector(2)}>Display Traveller</button>
      <button onClick={() => this.setSelector(3)}>Add Traveller</button>
      <button onClick={() => this.setSelector(4)}>Delete Traveller</button>
  </div>
	<div>
		{/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
		{/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
		{/*Q3. Code to call component that Displays Travellers.*/}
		{/*Q4. Code to call the component that adds a traveller.*/}
		{/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
    {this.state.selector === 1 && <Homepage travellers={this.state.travellers} />}
    {this.state.selector === 2 && <Display travellers={this.state.travellers} />}
    {this.state.selector === 3 && <Add bookTraveller={this.bookTraveller} />}
    {this.state.selector === 4 && <Delete deleteTraveller={this.deleteTraveller} />}
  </div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));

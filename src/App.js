import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation.js';
import ListItem from './components/ListItem.js';
import ViewItem from './components/ViewItem.js';
import { Tree } from 'react-organizational-chart';


const initialState = {
  items: [
    {
      id: 1,
      name: "Boaz CEO",
      values: [
        {
          id: 2,
          name: "Roni",
          values: [
            {
              id: 3,
              name: "ady",
              values: []
            },
            {
              id: 4,
              name: "Carmel",
              values: []
            }
          ]
        },
        {
          id: 5,
          name: "Fox",
          values: []
        }
      ]
    }
  ],
  next_id: 6,
  route: 'edit',
  isSignedIn: true,
  user: {
    id: 'test_id',
    name: 'test'
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
      const lastRoute = localStorage.getItem("route");
      if (lastRoute) {
        const nextRoute = JSON.parse(lastRoute);
        this.setState({route: nextRoute});
      };
  }

  onRouteChange = (route) => {
    localStorage.setItem('route', JSON.stringify(route))
    this.setState({isSignedIn: true, route});
  }

  // handle edit & add 
  onHandleSave = (id, value, add=false, item, items) => {
    console.log('save', id, value, add, item, items)
    id = parseInt(id)
    if (!item) {
      items = this.state.items;
      item = items[0]
    }
    if (item.id === id ) {
      if (add) {
        let next_id = this.state.next_id;
        item.values.push({
          id: next_id,
          name: value,
          values: []
        })
        next_id += 1;
        this.setState({next_id})
      } else {
        item.name = value;
      }
      this.setState({ items })
    } else {
      for ( let i in item.values) {
        this.onHandleSave(id, value, add, item.values[i], items)
      }
    }
  }

  // handle delete
  onHandleDelete = (id, item, items) => {
    id = parseInt(id)
    if (!item) {
      items = this.state.items
      item = items[0]
    }
    for( let i in item.values) {
      if (item.values[i].id === id) {
        if (item.values[i].values.length === 0) {
          item.values.splice(i, 1)
          this.setState({ items })
        } else {
          console.log('Can\'t delete role holders with employees')
        }
      } else if (item.values[i].values.length) {
        this.onHandleDelete(id, item.values[i], items)
      }
    }
  }

  render(){
    const { isSignedIn, route, items} = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'edit'
        ? <div>
            <article className="br3 ba mv4 mw6 center shadow-5">
                <main className="pa4 black-80">
                    <div className="measure">
                            <legend className="f2 fw6 ph0 mh0">Company tree</legend>
                            <div className="mv3">
                                <ul>
                                  {items.map(i => (
                                    <ListItem 
                                    item={i} 
                                    key={i.id} 
                                    onHandleDelete={this.onHandleDelete}
                                    onHandleSave={this.onHandleSave}
                                    />
                                    ))}
                                </ul>
                            </div>
                    </div>
                </main>
            </article>
          </div>
        : <div>
        <Tree label={<div>{items[0].name}</div>}> 
          <ViewItem
          item={items[0]}
          />
			  </Tree>
      </div>
        }
      </div>
    );    
  }
}

export default App;


import React from 'react';
import axios from 'axios';

import style from './list.css';
import Form from './Form';

const url = 'http://localhost:3001/items';

export default class List extends React.Component{

  constructor( props ) {
    super( props );

    this.state = {
      data: [],
      dataMapping: {},
      selectedItem: '',
      open: false,
    }
  }

  
  fetchData = () => {
    
    fetch( url ).then( response => response.json() ).then( data => {

      const dataMapping = ( data || [] ).reduce( ( acc, current ) => {
        acc[current.itemName] = current;
        return acc;
      }, {} );
      this.setState( { data, dataMapping } );
    } ).catch( err => console.error( err ) );
  }

  componentDidMount() {
    this.fetchData();
  }

  onClick = ( e, val ) => {

    e.preventDefault();
    this.setState( { open: true, selectedItem: val } );
  }

  compareObjs = ( obj, originalObj ) => {

    let isChanged = false;
    Object.keys( obj ).every( key => {
      if ( obj[key] !== originalObj[key] ) {
        isChanged = true;
        return false;
      }
      return true;
    } );

    return isChanged;
  };

  onFormSubmit = async obj => {
    
    this.setState( { open: false } );
    const { id, itemName } = obj;
    const { dataMapping } = this.state;
    const objToCompare = dataMapping[itemName];

    const isSame = this.compareObjs( obj, objToCompare );
    if ( !isSame ) return;

    // call request only if obj has changed
    try {
      await axios.put( `${ url }/${ id }`, obj );
      await this.fetchData();
    }
    catch( err ) {
      console.error( err );
    }
  }

  render() {

    const styles = {
      display: 'flex',
      flexDirection: 'column',
    };

    const itemNameStyles = {
      cursor: 'pointer',
    };

    const { data = [], open, dataMapping, selectedItem } = this.state;

    return <div className={ style.listwrapper } style={ styles }>
          <table>
            <thead >
              <tr> 
                <td> Id  </td>
                <td> Name  </td>
                <td> boh  </td>
                <td> moh  </td>
                <td> idu  </td>
                <td> OrderQuantity  </td>
              </tr>
            </thead>
            <tbody>
            { data && data.length > 0 && data.map( d => {
              return <tr key = { d.itemName }>
                <td> { d.id } </td>
                <td> <div style={ itemNameStyles } onClick={ e => this.onClick( e, d.itemName ) }>
                      { d.itemName } 
                  </div> </td>
                <td> { d.boh }  </td>
                <td> { d.moh }  </td>
                <td> { d.ldu }  </td>
                <td> { d.orderQty }  </td>
              </tr>
            } ) }
            </tbody>
          </table>

          { open && <Form data={ Object.assign( {}, dataMapping[selectedItem] ) } onSubmit={ this.onFormSubmit } />}
          </div>
  }
}
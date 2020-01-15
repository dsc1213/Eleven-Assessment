import React from 'react';

export default class Form extends React.Component{

  constructor( props ) {
    
    super( props );
    this.state = {

      dataObj: {},
      updatedObj: {},
    };
  }

  componentDidMount() {

    const { data = {} } = this.props;
    this.setState( { dataObj: data } )
  }

  onChange = ( key, value ) => {

    const { dataObj } = this.state;
    dataObj[key] = value;
    this.setState( { dataObj, updatedObj: { ...dataObj, key, id: dataObj.id, value } } );
  };

  onSubmit = () => {

    const { onSubmit } = this.props;
    onSubmit( this.state.dataObj );
  };

  render() {

    const { dataObj } = this.state;
    const disabledKeys = {
      id: true,
      itemName: true,
      ldu: true,
    };

    return <div>
            { Object.keys( dataObj ).map( key => <input key={ key } 
                                                      type="text" 
                                                      value={ dataObj[key] } 
                                                      onChange={ e => {
                                                        e.preventDefault();
                                                        this.onChange( key, e.target.value );
                                                      } }
                                                      onBlur={ this.onSubmit }
                                                      disabled={ disabledKeys[key] || false } /> ) }
          </div>
  }

}
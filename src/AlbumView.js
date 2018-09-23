import React from 'react'
import ReactDOM from 'react-dom';
class AlbumView extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            list:props.list
        }
    }

    onclick(){
        alert("1111");
    }


    List(){
        const listItems = this.state.list.map((item) =>{
            return  <div  key={item.album_id} className="row">
                <div title={item.album_name} className="col-xs-10  omit">{item.album_name}</div>
                <div className="col-xs-2">
                    <button  className="btn btn-success btn-xs" data-toggle="modal" data-target="#reviseSchool" >修改</button>
                    <button  className="btn btn-danger btn-xs" data-toggle="modal" data-target="#deleteSchool">删除</button></div>
            </div>
        });
        return listItems
    }

    render() {
        return (<div className='tablebody'>
                {this.List()}
            </div>
        );
    }
}

export default AlbumView;
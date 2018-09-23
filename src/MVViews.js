import React from 'react'
import ReactDOM from 'react-dom';
class MVViews extends React.Component {

    constructor(props) {
        super(props);

    }
    componentDidMount() {
        this.serverRequest =$.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'get',
            // data: comment,
            success: function(data){

                this.setState({songs: data.data});
            }.bind(this),
            error: function(xhr,status,err){
                console.error(this.props.url,status,err.toString());
            }.bind(this)
        });
    }
    componentWillUnmount() {
        this.serverRequest.abort();
    }

    List(){
        if(this.state==null)
            return null;
        const listItems = this.state.songs.map((item) =>{

            return  <div key={item.id} className="row">
                <div title={item.name} className="col-xs-2  omit">{item.name}</div>
                <div title={item.infor}  className="col-xs-4 omit">{item.infor}</div>
                <div className="col-xs-4">
                    <video className="col-xs-12 posi" src={item.src}  controls></video>
                    {/*<video className="col-xs-12 posi" src={item.src} controls style="width:100px;height:70px;"></video>*/}
                </div>
                <div className="col-xs-2">
                    <button  className="btn btn-success btn-xs" data-toggle="modal" data-target="#reviseUser" >修改</button>
                    <button  className="btn btn-danger btn-xs" data-toggle="modal" data-target="#deleteUser" >删除</button>
                </div>
            </div>
        });
        return listItems
        }

        render() {
            return (
            <div id='selectMv' className='tablebody'>
            {this.List()}
            </div>
            );
        }

        }
        export default MVViews;
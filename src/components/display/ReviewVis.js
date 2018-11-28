import React, { Component } from 'react';
import axios from 'axios';
import { ROOT } from '../../constants';
import ReactLoading from 'react-loading';
import { Text } from '../display';
import { InteractiveForceGraph, ForceGraphNode, ForceGraphLink } from 'react-vis-force';

class ReviewVis extends Component {
    constructor(props) {
        super(props);

        this.state = {reviews: [], isLoading: true, selectedText: null};
    }

    componentDidMount() {
        var URL = ROOT + "/reviews/vis/" + this.props.asin;
        axios.get(URL).then(response => {
            var summaries = {};
            for(var i = 0; i < response.data.length; i++) {
                summaries[response.data[i].reviewerID] = response.data[i].summary;
            }
            this.setState({reviews: response.data, isLoading: false, summaries: summaries});
        });
    }

    get_contents() {
        var contents = [];
        contents.push(<ForceGraphNode node={{ id: "good" }} fill="green"/>);
        contents.push(<ForceGraphNode node={{ id: "bad" }} fill="red"/>);
        var reviews = this.state.reviews;
        var limit = (reviews.length > 100) ? 100 : reviews.length;
        for(var i = 0; i < limit; i++) {
            var node_fill = (reviews[i].cluster === "good") ? "green" : "red";
            var new_node = <ForceGraphNode node={{ id: reviews[i].reviewerID, radius: 7 }} fill={node_fill} />
            contents.push(new_node);
            var link_target = reviews[i].cluster;
            var new_link = <ForceGraphLink link={{ source: reviews[i].reviewerID, target: link_target }} />
            contents.push(new_link);
        }
        return (contents);
    }

    showSelectedText() {
        if(this.state.selectedText != null) {
            return <Text>{this.state.selectedText}</Text>
        }
        return <div></div>
    }

    render() {
        if(this.state.isLoading) {
            return <ReactLoading height={"50px"} width={"50px"}/>;
        }
        if(this.state.reviews.length === 0) {
            return <Text>No Reviews to Show</Text>
        }
        return(
            <div>
                <InteractiveForceGraph simulationOptions={{ height: this.props.height, 
                                                 width: this.props.width,
                                                 animate: true }}
                                       onSelectNode={(event, node) => {
                                           this.setState({selectedText: this.state.summaries[node.id]});
                                       }}>
                    {this.get_contents()}
                </InteractiveForceGraph>
                {this.showSelectedText()}
            </div>
        );
    }
}

export default ReviewVis;

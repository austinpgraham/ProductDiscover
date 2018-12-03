import React, { Component } from 'react';
import axios from 'axios';
import { ROOT } from '../../constants';
import ReactLoading from 'react-loading';
import { Text } from '../display';
import { InteractiveForceGraph, ForceGraphNode, ForceGraphLink } from 'react-vis-force';

class ReviewVis extends Component {
    constructor(props) {
        /**
         * Construct the component, and
         * initalize the state.
         */
        super(props);

        this.state = {reviews: [], isLoading: true, selectedText: null};
    }

    componentDidMount() {
        /**
         * When the component is loaded onto the screen, 
         * query the server for the relevant product reviews
         * and add to the resulting state.
         */
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
        /**
         * Contruct the visualization.
         */
        var contents = [];
        // Construct the centers of the two clusters.
        contents.push(<ForceGraphNode node={{ id: "good" }} fill="green"/>);
        contents.push(<ForceGraphNode node={{ id: "bad" }} fill="red"/>);
        var reviews = this.state.reviews;
        // Only show 100 reviews.
        var limit = (reviews.length > 100) ? 100 : reviews.length;
        for(var i = 0; i < limit; i++) {
            // For each element, Add a node
            var node_fill = (reviews[i].cluster === "good") ? "green" : "red";
            var new_node = <ForceGraphNode node={{ id: reviews[i].reviewerID, radius: 7 }} fill={node_fill} />
            contents.push(new_node);
            // For each element, link it to the proper center
            var link_target = reviews[i].cluster;
            var new_link = <ForceGraphLink link={{ source: reviews[i].reviewerID, target: link_target }} />
            contents.push(new_link);
        }
        return (contents);
    }

    showSelectedText() {
        /**
         * Show the selected review text.
         */
        if(this.state.selectedText != null) {
            return <Text>{this.state.selectedText}</Text>
        }
        return <div></div>
    }

    render() {
        /**
         * Show loading on loading state, if an
         * empty result, show nothing, otherwise
         * render the force directed graph.
         */
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

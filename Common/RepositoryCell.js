
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

export default class RepositoryCell extends Component {

    render() {

        return (
            <View style={{ padding: 10 }}>
                <Text>{this.props.item.full_name}</Text>
                <Text>{this.props.item.description}</Text>
                <Text>{this.props.item.owner.avatar_url}</Text>
                <Text>{this.props.item.stargazers_count}</Text>
            </View>
        );
    }
}
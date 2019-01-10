
import React, { Component } from 'react';
import {Image, Text, View } from 'react-native';

export default class RepositoryCell extends Component {

    render() {

        return (
            <View style={{ padding: 10 }}>
                <Text>{this.props.item.full_name}</Text>
                <Text>{this.props.item.description}</Text>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                        <Text>Author:</Text>
                        <Image
                            style={{ height: 22, width: 22 }}
                            source={{ uri: this.props.item.owner.avatar_url }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                        <Text>Stars:</Text>
                        <Text>{this.props.item.stargazers_count}</Text>
                    </View>
                    {/* <Image style={{width:22, height:22}} source={require('ic_star')} /> */}
                </View>
            </View>
        );
    }
}

import React, { Component } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import HTMLView from 'react-native-htmlview';

export default class TrendingCell extends Component {

    render() {
        let description = '<p>'+this.props.item.description+'</p>';

        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onSelect}>
                <View style={styles.cell_container}>
                    <Text style={styles.title}>{this.props.item.fullName}</Text>
                    <HTMLView
                        value={description}
                        stylesheet={{
                            p:styles.description,
                            a:styles.description
                        }}
                    />
                    <Text style={styles.description}>{this.props.item.meta}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'red' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={styles.description}>Build by:</Text>
                            {this.props.item.contributors.map((result, i, arr) => {
                                return <Image
                                    style={{ height: 22, width: 22 }}
                                    source={{ uri: arr[i] }}
                                    key={i}
                                />
                            })}
                        </View>
                        {/* <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                            <Text>Stars:</Text>
                        </View> */}
                        <Image style={{ width: 22, height: 22 }} source={{ uri: 'ic_star' }} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        color: '#212121',
        marginBottom: 2,
        fontSize: 16,
    },
    description: {
        color: '#757575',
        marginBottom: 2,
        fontSize: 14,
    },
    cell_container: {
        elevation: 2,
        shadowColor: 'gray',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        borderColor: '#dddddd',
        marginVertical: 3,
        marginRight: 5,
        marginLeft: 5,
        padding: 10,
        backgroundColor: 'white',
        borderWidth: 0.5
    },
})
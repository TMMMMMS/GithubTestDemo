
import React, { Component } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';

export default class RepositoryCell extends Component {

    render() {

        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onSelect}>
                <View style={styles.cell_container}>
                    <Text style={styles.title}>{this.props.item.full_name}</Text>
                    <Text style={styles.description}>{this.props.item.description}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'red' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
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
        borderRadius: 2,
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
    }
})
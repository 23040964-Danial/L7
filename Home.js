import React, {useState} from 'react';
import {StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {datasource as initialData} from "./Data.js";

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15,
        margin: 10,
        textAlign: 'left',
    },
    opacityStyle: {
        borderWidth: 1,
        padding: 10,
    },
    headerText: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
        fontWeight:'bold',
    },
    buttonStyle: {
        marginVertical: 10,
    },
});

const Home = ({navigation}) => {
    const [datasource, setDatasource] = useState(initialData);

    const renderItem = ({item, index}) => {
        return (
            <TouchableOpacity style={styles.opacityStyle}
                              onPress={() => {
                                  navigation.navigate('Edit', {index, key: item.key, completed: item.completed, setDatasource});
                              }}>
                <Text style={styles.textStyle}>{item.key} - {item.completed ? 'Completed' : 'Not Completed'}</Text>
            </TouchableOpacity>
        );
    };

    const calculateStatus = () => {
        const totalTasks = datasource[0].data.length;
        const completedTasks = datasource[0].data.filter(task => task.completed).length;
        const percentage = ((completedTasks / totalTasks) * 100).toFixed(1);

        return {completedTasks, totalTasks, percentage};
    };

    const {completedTasks, totalTasks, percentage} = calculateStatus();

    return (
        <View>
            <SectionList sections={datasource} renderItem={renderItem}
                         renderSectionHeader={({section:{title,bgcolor}})=>(
                             <Text style={[styles.headerText,{backgroundColor:bgcolor}]}>
                                 {title}
                             </Text>
                         )}/>
            <StatusBar/>
            <View style={styles.buttonStyle}>
                <Button title='Add Task' onPress={() => {navigation.navigate('Add', {setDatasource})}} />
            </View>
            <View style={styles.buttonStyle}>
                <Button title='Overall Status' onPress={() => {
                    alert(`Completed Tasks: ${completedTasks} \nIncomplete Tasks: ${totalTasks - completedTasks}
                      \n${percentage}% of tasks complete`);
                }} />
            </View>
        </View>
    );
};

export default Home;

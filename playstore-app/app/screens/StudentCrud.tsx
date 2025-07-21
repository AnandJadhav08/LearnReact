// screens/AddStudent.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Alert,
    Switch,
    TouchableOpacity,
    FlatList,
    ScrollView,
    StyleSheet
} from 'react-native';

interface MyStudent {
    id: string;
    name: string;
    age: number;
    grade: string;
    course: string;
    isPassed: boolean;
}

export default function StudentCrud() {
    const [formData, setFormData] = useState<MyStudent>({
        id: '',
        name: '',
        age: 0,
        grade: '',
        course: '',
        isPassed: false,
    });

    const [showList, setShowList] = useState(false);
    const [studentList, setStudentList] = useState<MyStudent[]>([]);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    //console.log("formData:", studentList);
    const handleChange = (field: keyof MyStudent, value: string | boolean) => {
        setFormData({
            ...formData,
            [field]: field === 'age' ? Number(value) || 0 : value,
        });
    };

    const resetForm = () => {
        setFormData({ id: '', name: '', age: 0, grade: '', course: '', isPassed: false });
        setIsUpdateMode(false);
    };

    const handleAddStudent = async () => {
        if (!formData.name || !formData.grade || !formData.course || formData.age <= 0) {
            return Alert.alert('Error', 'Please fill all required fields correctly.');
        }

        try {
            const url = isUpdateMode
                ? `http://localhost:8000/api/students/${formData.id}`
                : 'http://localhost:8000/api/students/create';

            const method = isUpdateMode ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const contentType = response.headers.get('content-type');
            const data = contentType?.includes('application/json') ? await response.json() : await response.text();

            if (!response.ok) {
                throw new Error(typeof data === 'string' ? data : data.message || 'Error');
            }

            Alert.alert('Success', isUpdateMode ? 'Student updated!' : 'Student created!');
            resetForm();
            handleGetAllStudents();

        } catch (err: any) {
            Alert.alert('Error', err.message || 'Something went wrong');
        }
    };

    const handleGetAllStudents = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/students/', {
                method: 'GET',
                headers: { Accept: 'application/json' },
            });

            const contentType = response.headers.get('content-type');
            const data = contentType?.includes('application/json') ? await response.json() : await response.text();

            if (!response.ok) {
                throw new Error(typeof data === 'string' ? data : data.message || 'Error fetching students');
            }

            setStudentList(data);
            setShowList(true);
        } catch (err: any) {
            Alert.alert('Error', err.message || 'Failed to load students');
        }
    };

    const handleDeleteStudent = async (_id: string) => {
        try {
            console.log('Deleting student with ID:', _id);

            const response = await fetch(`http://localhost:8000/api/students/${_id}`, {
                method: 'DELETE',
                headers: { Accept: 'application/json' },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete');
            }

            Alert.alert('Deleted', 'Student removed.');
            setStudentList(prev => prev.filter(stu => stu.id !== _id));
        } catch (err: any) {
            Alert.alert('Error', err.message);
        }
    };

    const handleEditStudent = (student: MyStudent) => {
        setFormData(student);
        setIsUpdateMode(true);
        Alert.alert('Edit Mode', `Now editing ${student.name}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{isUpdateMode ? 'Update Student' : 'Add New Student'}</Text>
            <ScrollView>
                <View style={styles.formCard}>
                    <Text style={styles.label}>Name *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter name"
                        value={formData.name}
                        onChangeText={(text) => handleChange('name', text)}
                    />

                    <Text style={styles.label}>Age *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter age"
                        keyboardType="numeric"
                        value={formData.age ? String(formData.age) : ''}
                        onChangeText={(text) => handleChange('age', text)}
                    />

                    <Text style={styles.label}>Grade *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter grade"
                        value={formData.grade}
                        onChangeText={(text) => handleChange('grade', text)}
                    />

                    <Text style={styles.label}>Course *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter course"
                        value={formData.course}
                        onChangeText={(text) => handleChange('course', text)}
                    />

                    <View style={styles.switchContainer}>
                        <Text style={styles.label}>Is Passed</Text>
                        <Switch
                            value={formData.isPassed}
                            onValueChange={(val) => handleChange('isPassed', val)}
                        />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleAddStudent}>
                        <Text style={styles.buttonText}>{isUpdateMode ? 'Update Student' : 'Create Student'}</Text>
                    </TouchableOpacity>

                    {isUpdateMode && (
                        <TouchableOpacity style={styles.button_1} onPress={resetForm}>
                            <Text style={styles.buttonText}>Cancel Update</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity style={styles.button_1} onPress={handleGetAllStudents}>
                        <Text style={styles.buttonText}>Show All Students</Text>
                    </TouchableOpacity>

                    {showList && (
                        <View style={{ marginTop: 30 }}>
                            <Text style={styles.title}>Student List</Text>
                            <FlatList
                                data={studentList}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <View style={styles.card}>
                                        <Text style={styles.cardText}>👤 Name: {item.name}</Text>
                                        <Text style={styles.cardText}>🎂 Age: {item.age}</Text>
                                        <Text style={styles.cardText}>🎓 Grade: {item.grade}</Text>
                                        <Text style={styles.cardText}>📚 Course: {item.course}</Text>
                                        <Text style={styles.cardText}>✅ Passed: {item.isPassed ? 'Yes' : 'No'}</Text>
                                        <Text style={styles.cardText}>🗑️ ID: {item.id}</Text>
                                        <TouchableOpacity
                                            style={styles.updateButton}
                                            onPress={() => handleEditStudent(item)}
                                        >
                                            <Text style={styles.updateText}>Edit</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={styles.deleteButton}
                                            onPress={() =>
                                                handleDeleteStudent(item.id)
                                            }
                                        >
                                            <Text style={styles.deleteText}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

// styles.ts

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 15,
        color: '#222',
    },
    formCard: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    label: {
        fontSize: 16,
        marginTop: 15,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        height: 45,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 25,
        alignItems: 'center',
    },
    button_1: {
        backgroundColor: '#6c757d',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#fdfdfd',
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    cardText: {
        fontSize: 15,
        marginBottom: 4,
        color: '#444',
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        paddingVertical: 8,
        marginTop: 10,
        borderRadius: 6,
        alignItems: 'center',
    },
    deleteText: {
        color: 'white',
        fontWeight: 'bold',
    },
    updateButton: {
        backgroundColor: '#28a745',
        paddingVertical: 8,
        marginTop: 10,
        borderRadius: 6,
        alignItems: 'center',
    },
    updateText: {
        color: 'white',
        fontWeight: 'bold',
    },
});


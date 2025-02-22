import { useState } from 'react';
import { login } from '../utils/auth';
import { useRouter } from 'next/router';
import { Container, TextField, Button, Typography, Paper, Box } from '@mui/material';

export default function LoginPage(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        setError('');
        try {
            await login(email, password);
            router.push('/tasks');
        } catch (error) {
            setError('ログインに失敗しました。メールアドレスまたはパスワードを確認してください。');
        }
    };

    return(
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', marginTop: 8 }}>
                <Typography variant="h5" gutterBottom>
                ログイン
                </Typography>

                {error && <Typography color="error">{error}</Typography>}

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 }}>
                <TextField
                    label="メールアドレス"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    label="パスワード"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button variant="contained" color="primary" onClick={handleLogin}>
                    ログイン
                </Button>
                </Box>
            </Paper>
        </Container>
    );
}
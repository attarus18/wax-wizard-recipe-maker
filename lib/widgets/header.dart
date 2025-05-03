
import 'package:flutter/material.dart';

class Header extends StatelessWidget {
  const Header({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const SizedBox(height: 16),
        Text(
          'Wax Wizard',
          style: Theme.of(context).textTheme.displayLarge,
        ),
        Container(
          margin: const EdgeInsets.only(top: 4),
          height: 1,
          width: 150,
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              colors: [Colors.transparent, Color(0xFFFFA726), Colors.transparent],
            ),
          ),
        ),
        const SizedBox(height: 16),
        Text(
          'Calcola facilmente la quantità esatta di ingredienti per le tue candele',
          textAlign: TextAlign.center,
          style: Theme.of(context).textTheme.bodyLarge?.copyWith(
            color: Colors.black54,
          ),
        ),
      ],
    );
  }
}

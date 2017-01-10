--------------------------------------------------------------------------------
-- Company: 
-- Engineer:
--
-- Create Date:   11:06:51 07/23/2016
-- Design Name:   
-- Module Name:   C:/Users/Fulton/ISE Project/RegularCPU/TestALU.vhd
-- Project Name:  RegularCPU
-- Target Device:  
-- Tool versions:  
-- Description:   
-- 
-- VHDL Test Bench Created by ISE for module: ALU
-- 
-- Dependencies:
-- 
-- Revision:
-- Revision 0.01 - File Created
-- Additional Comments:
--
-- Notes: 
-- This testbench has been automatically generated using types std_logic and
-- std_logic_vector for the ports of the unit under test.  Xilinx recommends
-- that these types always be used for the top-level I/O of a design in order
-- to guarantee that the testbench will bind correctly to the post-implementation 
-- simulation model.
--------------------------------------------------------------------------------
LIBRARY ieee;
USE ieee.std_logic_1164.ALL;
 
-- Uncomment the following library declaration if using
-- arithmetic functions with Signed or Unsigned values
--USE ieee.numeric_std.ALL;
 
ENTITY TestALU IS
END TestALU;
 
ARCHITECTURE behavior OF TestALU IS 
 
    -- Component Declaration for the Unit Under Test (UUT)
 
    COMPONENT ALU
    PORT(
         cs : IN  std_logic;
			cs_stor:in std_logic;
			cs_writ:in std_logic;
         ir_in : IN  std_logic_vector(15 downto 0);
			reset:in std_logic;
         reg_update : IN  std_logic;
         reg_up_data : IN  std_logic_vector(7 downto 0);
         ctrl_ifwrite : OUT  std_logic;
         ctrl_ifpc : OUT  std_logic;
         ctrl_ifextern : OUT  std_logic;
         ctrl_ifio : OUT  std_logic;
         ctrl_ifread : OUT  std_logic;
         m_addr : OUT  std_logic_vector(15 downto 0);
         m_data : OUT  std_logic_vector(7 downto 0);
         alu_out : OUT  std_logic_vector(15 downto 0)
        );
    END COMPONENT;

   --Inputs
   signal cs : std_logic := '0';
	signal cs_stor: std_logic:='0';
	signal cs_writ: std_logic:='0';
   signal ir_in : std_logic_vector(15 downto 0) := (others => '0');
	signal reset: std_logic;
   signal reg_update : std_logic := '0';
   signal reg_up_data : std_logic_vector(7 downto 0) := (others => '0');

 	--Outputs
   signal ctrl_ifwrite : std_logic;
   signal ctrl_ifpc : std_logic;
   signal ctrl_ifextern : std_logic;
   signal ctrl_ifio : std_logic;
   signal ctrl_ifread : std_logic;
   signal m_addr : std_logic_vector(15 downto 0);
   signal m_data : std_logic_vector(7 downto 0);
   signal alu_out : std_logic_vector(15 downto 0);
   -- No clocks detected in port list. Replace clock below with 
   -- appropriate port name 
 
   constant clock_period : time := 10 ns;
 
BEGIN
 
	-- Instantiate the Unit Under Test (UUT)
   uut: ALU PORT MAP (
          cs => cs,
			 cs_stor=>cs_stor,
			 cs_writ=>cs_writ,
          ir_in => ir_in,
			 reset=>reset,
          reg_update => reg_update,
          reg_up_data => reg_up_data,
          ctrl_ifwrite => ctrl_ifwrite,
          ctrl_ifpc => ctrl_ifpc,
          ctrl_ifextern => ctrl_ifextern,
          ctrl_ifio => ctrl_ifio,
          ctrl_ifread => ctrl_ifread,
          m_addr => m_addr,
          m_data => m_data,
          alu_out => alu_out
        );


   -- Stimulus process
   stim_proc: process
   begin		
      -- hold reset state for 100 ns.
		
		reset<='1';
      wait for 100 ns;	
		reset<='0';
		
		ir_in<="0100000011110001";--jz r0,x
		reg_update<='0';
		cs<='0';
      wait for clock_period*10;
		cs<='1';
		ir_in<="0100000011110001";--jz r0,x
		wait for clock_period*10;--回写pc
		ir_in<="1000100011110001";--lda,r0,x
		wait for clock_period*5;
		cs<='0';
		cs_writ<='1';
		reg_update<='1';
		reg_up_data<="01010111"; --1ns后回写数据
		wait for clock_period*10;
		reg_update<='0';
		cs<='1';
		cs_writ<='0';
		ir_in<="1000000011110001";--sta r0,x
		wait for 10 ns; --等待回写数据
		
		
		
		cs<='0';
		ir_in<="0001100000010001";
		wait for clock_period*10;
		cs<='1';
      --add  -- insert stimulus here 
		wait for 10 ns;
		cs<='0';
		reg_update<='1';
		reg_up_data<="00010001";
		
		
		ir_in<="0001100100100010"; --mvi r1,22H
		wait for clock_period*10;
		reg_update<='0'; 
		cs<='1';

		wait for 10 ns;
		cs<='0';
		reg_update<='1';
		reg_up_data<="00100010";
		
		
		--	ir_in<="0000000000000001";--add r0,r1
		ir_in<="0000100100000000"; --sub r1,r0
		wait for clock_period*10;
		cs<='1';
		reg_update<='0';
	
		--here to watch the alu_out;
		
		
		
      wait;
   end process;

END;
